package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoom is a Querydsl query type for Room
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QRoom extends EntityPathBase<Room> {

    private static final long serialVersionUID = 846449565L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoom room = new QRoom("room");

    public final StringPath description = createString("description");

    public final QUser host;

    public final BooleanPath isActive = createBoolean("isActive");

    public final StringPath password = createString("password");

    public final DateTimePath<java.time.LocalDateTime> roomEndTime = createDateTime("roomEndTime", java.time.LocalDateTime.class);

    public final NumberPath<Long> roomId = createNumber("roomId", Long.class);

    public final DateTimePath<java.time.LocalDateTime> roomStartTime = createDateTime("roomStartTime", java.time.LocalDateTime.class);

    public final StringPath title = createString("title");

    public QRoom(String variable) {
        this(Room.class, forVariable(variable), INITS);
    }

    public QRoom(Path<? extends Room> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoom(PathMetadata metadata, PathInits inits) {
        this(Room.class, metadata, inits);
    }

    public QRoom(Class<? extends Room> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.host = inits.isInitialized("host") ? new QUser(forProperty("host")) : null;
    }

}

