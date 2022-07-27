package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QQuiz is a Querydsl query type for Quiz
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QQuiz extends EntityPathBase<Quiz> {

    private static final long serialVersionUID = 846425367L;

    public static final QQuiz quiz = new QQuiz("quiz");

    public final StringPath answer = createString("answer");

    public final StringPath content = createString("content");

    public final StringPath options = createString("options");

    public final NumberPath<Integer> optionSize = createNumber("optionSize", Integer.class);

    public final NumberPath<Long> quizId = createNumber("quizId", Long.class);

    public final NumberPath<Integer> quizPic = createNumber("quizPic", Integer.class);

    public final NumberPath<Integer> type = createNumber("type", Integer.class);

    public QQuiz(String variable) {
        super(Quiz.class, forVariable(variable));
    }

    public QQuiz(Path<? extends Quiz> path) {
        super(path.getType(), path.getMetadata());
    }

    public QQuiz(PathMetadata metadata) {
        super(Quiz.class, metadata);
    }

}

