package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QQuizBook is a Querydsl query type for QuizBook
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QQuizBook extends EntityPathBase<QuizBook> {

    private static final long serialVersionUID = -1034372960L;

    public static final QQuizBook quizBook = new QQuizBook("quizBook");

    public final NumberPath<Long> quizbookId = createNumber("quizbookId", Long.class);

    public final NumberPath<Integer> quizbookSize = createNumber("quizbookSize", Integer.class);

    public QQuizBook(String variable) {
        super(QuizBook.class, forVariable(variable));
    }

    public QQuizBook(Path<? extends QuizBook> path) {
        super(path.getType(), path.getMetadata());
    }

    public QQuizBook(PathMetadata metadata) {
        super(QuizBook.class, metadata);
    }

}

