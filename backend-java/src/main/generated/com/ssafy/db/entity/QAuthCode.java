package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QAuthCode is a Querydsl query type for AuthCode
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAuthCode extends EntityPathBase<AuthCode> {

    private static final long serialVersionUID = 1443759479L;

    public static final QAuthCode authCode = new QAuthCode("authCode");

    public final StringPath authKey = createString("authKey");

    public final DateTimePath<java.time.LocalDateTime> createdTime = createDateTime("createdTime", java.time.LocalDateTime.class);

    public final StringPath email = createString("email");

    public QAuthCode(String variable) {
        super(AuthCode.class, forVariable(variable));
    }

    public QAuthCode(Path<? extends AuthCode> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAuthCode(PathMetadata metadata) {
        super(AuthCode.class, metadata);
    }

}

