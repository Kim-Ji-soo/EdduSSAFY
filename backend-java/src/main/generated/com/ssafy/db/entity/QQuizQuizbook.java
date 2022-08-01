package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QQuizQuizbook is a Querydsl query type for QuizQuizbook
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QQuizQuizbook extends EntityPathBase<QuizQuizbook> {

    private static final long serialVersionUID = 1248261365L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QQuizQuizbook quizQuizbook = new QQuizQuizbook("quizQuizbook");

    public final NumberPath<Long> pk = createNumber("pk", Long.class);

    public final QQuiz quiz;

    public final QQuizbook quizbook;

    public QQuizQuizbook(String variable) {
        this(QuizQuizbook.class, forVariable(variable), INITS);
    }

    public QQuizQuizbook(Path<? extends QuizQuizbook> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QQuizQuizbook(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QQuizQuizbook(PathMetadata metadata, PathInits inits) {
        this(QuizQuizbook.class, metadata, inits);
    }

    public QQuizQuizbook(Class<? extends QuizQuizbook> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.quiz = inits.isInitialized("quiz") ? new QQuiz(forProperty("quiz")) : null;
        this.quizbook = inits.isInitialized("quizbook") ? new QQuizbook(forProperty("quizbook")) : null;
    }

}

