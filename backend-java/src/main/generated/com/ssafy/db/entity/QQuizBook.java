package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QQuizbook is a Querydsl query type for Quizbook
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QQuizbook extends EntityPathBase<Quizbook> {

    private static final long serialVersionUID = -1033419648L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QQuizbook quizbook = new QQuizbook("quizbook");

    public final NumberPath<Long> quizbookId = createNumber("quizbookId", Long.class);

    public final StringPath title = createString("title");

    public final QUser user;

    public QQuizbook(String variable) {
        this(Quizbook.class, forVariable(variable), INITS);
    }

    public QQuizbook(Path<? extends Quizbook> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QQuizbook(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QQuizbook(PathMetadata metadata, PathInits inits) {
        this(Quizbook.class, metadata, inits);
    }

    public QQuizbook(Class<? extends Quizbook> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

