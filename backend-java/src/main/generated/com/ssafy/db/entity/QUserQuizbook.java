package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserQuizbook is a Querydsl query type for UserQuizbook
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserQuizbook extends EntityPathBase<UserQuizbook> {

    private static final long serialVersionUID = -870651797L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserQuizbook userQuizbook = new QUserQuizbook("userQuizbook");

    public final NumberPath<Long> pk = createNumber("pk", Long.class);

    public final QQuizbook quizbook;

    public final QUser user;

    public QUserQuizbook(String variable) {
        this(UserQuizbook.class, forVariable(variable), INITS);
    }

    public QUserQuizbook(Path<? extends UserQuizbook> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserQuizbook(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserQuizbook(PathMetadata metadata, PathInits inits) {
        this(UserQuizbook.class, metadata, inits);
    }

    public QUserQuizbook(Class<? extends UserQuizbook> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.quizbook = inits.isInitialized("quizbook") ? new QQuizbook(forProperty("quizbook")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

