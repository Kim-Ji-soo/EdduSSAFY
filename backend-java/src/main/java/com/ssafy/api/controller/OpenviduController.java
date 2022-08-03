package com.ssafy.api.controller;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.OpenviduPostReq;
import com.ssafy.api.request.OpenviduRemoveUserReq;
import com.ssafy.api.response.OpenviduPostRes;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.model.response.BaseResponseBody;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Recording;
import io.openvidu.java.client.RecordingProperties;
import io.openvidu.java.client.Session;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(value = "openvidu처리 API", tags = {"Openvidu."})
@RestController
@RequestMapping("/api/openvidu")
public class OpenviduController {

	// OpenVidu object as entrypoint of the SDK
	private OpenVidu openVidu;

	// Collection to pair session names and OpenVidu Session objects
	private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
	// Collection to pair session names and tokens (the inner Map pairs tokens and
	// role associated)
	private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();
	// Collection to pair session names and recording objects
	private Map<String, Boolean> sessionRecordings = new ConcurrentHashMap<>();

	// URL where our OpenVidu server is listening
	private String OPENVIDU_URL;
	// Secret shared with our OpenVidu server
	private String SECRET;

	@Autowired
	public OpenviduController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
		this.SECRET = secret;
		this.OPENVIDU_URL = openviduUrl;
		this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
	}

	/*******************/
	/*** Session API ***/
	/*******************/

	@ApiOperation(value = "session 토큰 가져오기", notes = "세션 id의 정보에 따라 토큰을 가져온다.")//body{tokenName:'aaa'}
	@PostMapping("/get-token")
	public ResponseEntity<OpenviduPostRes> getToken(@RequestBody @ApiParam(value="token가져오기", required = true) OpenviduPostReq openviduPostReq) {

		System.out.println("Getting sessionId and token | {sessionName}=" +openviduPostReq.getSessionName());
		String sessionName=openviduPostReq.getSessionName();

		// The video-call to connect ("TUTORIAL")

		// Role associated to this user
		OpenViduRole role = OpenViduRole.PUBLISHER;

		// Build connectionProperties object with the serverData and the role
		ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC)
				.role(role).data("").build();

		//세션이 있으면 -> 참가자로서 입장
		if (this.mapSessions.get(sessionName) != null) {
			// Session already exists
			System.out.println("Existing session " + sessionName);
			try {

				// Generate a new token with the recently created connectionProperties
				String token = this.mapSessions.get(sessionName).createConnection(connectionProperties).getToken();

				// Update our collection storing the new token
				this.mapSessionNamesTokens.get(sessionName).put(token, role);

				// Prepare the response with the token
				// Return the response to the client
				return ResponseEntity.ok(OpenviduPostRes.of(200, "Success",token));

			} catch (OpenViduJavaClientException e1) {
				// If internal error generate an error message and return it to client
				return ResponseEntity.status(401).body(OpenviduPostRes.of(401, "Invalid", null));
			} catch (OpenViduHttpException e2) {
				if (404 == e2.getStatus()) {
					// Invalid sessionId (user left unexpectedly). Session object is not valid
					// anymore. Clean collections and continue as new session
					this.mapSessions.remove(sessionName);
					this.mapSessionNamesTokens.remove(sessionName);
				}
			}
		}

		// New session
		try {
			// Create a new OpenVidu Session
			Session session = this.openVidu.createSession();
			System.out.println("New session " + sessionName);
			// Generate a new token with the recently created connectionProperties
			String token = session.createConnection(connectionProperties).getToken();

			// Store the session and the token in our collections
			this.mapSessions.put(sessionName, session);
			this.mapSessionNamesTokens.put(sessionName, new ConcurrentHashMap<>());
			this.mapSessionNamesTokens.get(sessionName).put(token, role);

			// Prepare the response with the sessionId and the token
			System.out.println(token);
			// Return the response to the client
			return ResponseEntity.ok(OpenviduPostRes.of(200, "Success",token ));

		} catch (Exception e) {
			// If error generate an error message and return it to client
			return ResponseEntity.status(401).body(OpenviduPostRes.of(401, "Invalid", null));
		}
	}
	
	

	@ApiOperation(value = "user 지우기", notes = "유처가 세션을 나간다. 마지막 사람까지 나갈경우 세션은 없어진다.")//body{tokenName:'aaa'}
	@RequestMapping(value = "/remove-user", method = RequestMethod.POST)
	public ResponseEntity<? extends BaseResponseBody> removeUser(@RequestBody @ApiParam(value="user지우기", required = true)OpenviduRemoveUserReq openviduRemoveUserReq) throws Exception {

		System.out.println("Removing user | {sessionName, token}=" + openviduRemoveUserReq.toString());

		// Retrieve the params from BODY
		String sessionName = openviduRemoveUserReq.getSessionName();
		String token = openviduRemoveUserReq.getToken();

		// If the session exists
		if (this.mapSessions.get(sessionName) != null && this.mapSessionNamesTokens.get(sessionName) != null) {

			// If the token exists
			if (this.mapSessionNamesTokens.get(sessionName).remove(token) != null) {
				// User left the session
				if (this.mapSessionNamesTokens.get(sessionName).isEmpty()) {
					// Last user left: session must be removed
					this.mapSessions.remove(sessionName);
				}
				return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
			} else {
				// The TOKEN wasn't valid
				System.out.println("Problems in the app server: the TOKEN wasn't valid");
				return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Problems in the app server: the TOKEN wasn't valid"));
			}

		} else {
			// The SESSION does not exist
			System.out.println("Problems in the app server: the SESSION does not exist");
			return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Problems in the app server: the SESSION does not exist"));
		}
	}

	@ApiOperation(value = "session 닫기", notes = "해당하는 sessionName의 세션을 지운다.")//body{tokenName:'aaa'}
	@RequestMapping(value = "/close-session/{sessionName}", method = RequestMethod.DELETE)
	public ResponseEntity<? extends BaseResponseBody> closeSession(@PathVariable  String sessionName) throws Exception {

		System.out.println("Closing session | {sessionName}="+sessionName );

		// Retrieve the param from BODY
		String session = sessionName;

		// If the session exists
		if (this.mapSessions.get(session) != null && this.mapSessionNamesTokens.get(session) != null) {
			Session s = this.mapSessions.get(session);
			s.close();
			this.mapSessions.remove(session);
			this.mapSessionNamesTokens.remove(session);
			this.sessionRecordings.remove(s.getSessionId());
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		} else {
			// The SESSION does not exist
			System.out.println("Problems in the app server: the SESSION does not exist");
			return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Problems in the app server: the SESSION does not exist"));
		}
		
	}



	/*******************/
	/** Recording API **/
	/*******************/

//	@RequestMapping(value = "/recording/start", method = RequestMethod.POST)
//	public ResponseEntity<?> startRecording(@RequestBody Map<String, Object> params) {
//		String sessionId = (String) params.get("session");
//		Recording.OutputMode outputMode = Recording.OutputMode.valueOf((String) params.get("outputMode"));
//		boolean hasAudio = (boolean) params.get("hasAudio");
//		boolean hasVideo = (boolean) params.get("hasVideo");
//
//		RecordingProperties properties = new RecordingProperties.Builder().outputMode(outputMode).hasAudio(hasAudio)
//				.hasVideo(hasVideo).build();
//
//		System.out.println("Starting recording for session " + sessionId + " with properties {outputMode=" + outputMode
//				+ ", hasAudio=" + hasAudio + ", hasVideo=" + hasVideo + "}");
//
//		try {
//			Recording recording = this.openVidu.startRecording(sessionId, properties);
//			this.sessionRecordings.put(sessionId, true);
//			return new ResponseEntity<>(recording, HttpStatus.OK);
//		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
//			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}
//
//	@RequestMapping(value = "/recording/stop", method = RequestMethod.POST)
//	public ResponseEntity<?> stopRecording(@RequestBody Map<String, Object> params) {
//		String recordingId = (String) params.get("recording");
//
//		System.out.println("Stoping recording | {recordingId}=" + recordingId);
//
//		try {
//			Recording recording = this.openVidu.stopRecording(recordingId);
//			this.sessionRecordings.remove(recording.getSessionId());
//			return new ResponseEntity<>(recording, HttpStatus.OK);
//		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
//			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}
//
//	@RequestMapping(value = "/recording/delete", method = RequestMethod.DELETE)
//	public ResponseEntity<?> deleteRecording(@RequestBody Map<String, Object> params) {
//		String recordingId = (String) params.get("recording");
//
//		System.out.println("Deleting recording | {recordingId}=" + recordingId);
//
//		try {
//			this.openVidu.deleteRecording(recordingId);
//			return new ResponseEntity<>(HttpStatus.OK);
//		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
//			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}
//
//	@RequestMapping(value = "/recording/get/{recordingId}", method = RequestMethod.GET)
//	public ResponseEntity<?> getRecording(@PathVariable(value = "recordingId") String recordingId) {
//
//		System.out.println("Getting recording | {recordingId}=" + recordingId);
//
//		try {
//			Recording recording = this.openVidu.getRecording(recordingId);
//			return new ResponseEntity<>(recording, HttpStatus.OK);
//		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
//			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}
//
//	@RequestMapping(value = "/recording/list", method = RequestMethod.GET)
//	public ResponseEntity<?> listRecordings() {
//
//		System.out.println("Listing recordings");
//
//		try {
//			List<Recording> recordings = this.openVidu.listRecordings();
//
//			return new ResponseEntity<>(recordings, HttpStatus.OK);
//		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
//			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}
//
//	private ResponseEntity<JsonObject> getErrorResponse(Exception e) {
//		JsonObject json = new JsonObject();
//		json.addProperty("cause", e.getCause().toString());
//		json.addProperty("error", e.getMessage());
//		json.addProperty("exception", e.getClass().getCanonicalName());
//		return new ResponseEntity<>(json, HttpStatus.INTERNAL_SERVER_ERROR);
//	}
//
//	protected JsonObject sessionToJson(Session session) {
//		Gson gson = new Gson();
//		JsonObject json = new JsonObject();
//		json.addProperty("sessionId", session.getSessionId());
//		json.addProperty("customSessionId", session.getProperties().customSessionId());
//		json.addProperty("recording", session.isBeingRecorded());
//		json.addProperty("mediaMode", session.getProperties().mediaMode().name());
//		json.addProperty("recordingMode", session.getProperties().recordingMode().name());
//		json.add("defaultRecordingProperties",
//				gson.toJsonTree(session.getProperties().defaultRecordingProperties()).getAsJsonObject());
//		JsonObject connections = new JsonObject();
//		connections.addProperty("numberOfElements", session.getConnections().size());
//		JsonArray jsonArrayConnections = new JsonArray();
//		session.getConnections().forEach(con -> {
//			JsonObject c = new JsonObject();
//			c.addProperty("connectionId", con.getConnectionId());
//			c.addProperty("role", con.getRole().name());
//			c.addProperty("token", con.getToken());
//			c.addProperty("clientData", con.getClientData());
//			c.addProperty("serverData", con.getServerData());
//			JsonArray pubs = new JsonArray();
//			con.getPublishers().forEach(p -> {
//				pubs.add(gson.toJsonTree(p).getAsJsonObject());
//			});
//			JsonArray subs = new JsonArray();
//			con.getSubscribers().forEach(s -> {
//				subs.add(s);
//			});
//			c.add("publishers", pubs);
//			c.add("subscribers", subs);
//			jsonArrayConnections.add(c);
//		});
//		connections.add("content", jsonArrayConnections);
//		json.add("connections", connections);
//		return json;
//	}

}
