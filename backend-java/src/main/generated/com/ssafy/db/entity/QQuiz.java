package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QQuiz is a Querydsl query type for Quiz
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QQuiz extends EntityPathBase<Quiz> {

    private static final long serialVersionUID = 846425367L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QQuiz quiz = new QQuiz("quiz");

    public final StringPath answer = createString("answer");

    public final StringPath content = createString("content");

    public final BooleanPath isChoice = createBoolean("isChoice");

    public final StringPath options = createString("options");

    public final NumberPath<Integer> optionSize = createNumber("optionSize", Integer.class);

    public final QQuizbook quizbook;

    public final NumberPath<Long> quizId = createNumber("quizId", Long.class);

    public final StringPath quizPic = createString("quizPic");

    public final NumberPath<Integer> score = createNumber("score", Integer.class);

    public QQuiz(String variable) {
        this(Quiz.class, forVariable(variable), INITS);
    }

    public QQuiz(Path<? extends Quiz> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QQuiz(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QQuiz(PathMetadata metadata, PathInits inits) {
        this(Quiz.class, metadata, inits);
    }

    public QQuiz(Class<? extends Quiz> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.quizbook = inits.isInitialized("quizbook") ? new QQuizbook(forProperty("quizbook")) : null;
    }

}

