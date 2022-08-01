package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QQuizbook is a Querydsl query type for Quizbook
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QQuizbook extends EntityPathBase<Quizbook> {

    private static final long serialVersionUID = -1033419648L;

    public static final QQuizbook quizbook = new QQuizbook("quizbook");

    public final NumberPath<Long> quizbookId = createNumber("quizbookId", Long.class);

    public final NumberPath<Integer> quizbookSize = createNumber("quizbookSize", Integer.class);

    public QQuizbook(String variable) {
        super(Quizbook.class, forVariable(variable));
    }

    public QQuizbook(Path<? extends Quizbook> path) {
        super(path.getType(), path.getMetadata());
    }

    public QQuizbook(PathMetadata metadata) {
        super(Quizbook.class, metadata);
    }

}

