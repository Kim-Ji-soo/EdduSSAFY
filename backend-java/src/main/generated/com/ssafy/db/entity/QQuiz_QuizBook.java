package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QQuiz_QuizBook is a Querydsl query type for Quiz_QuizBook
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QQuiz_QuizBook extends EntityPathBase<Quiz_QuizBook> {

    private static final long serialVersionUID = -510553818L;

    public static final QQuiz_QuizBook quiz_QuizBook = new QQuiz_QuizBook("quiz_QuizBook");

    public final NumberPath<Long> pk = createNumber("pk", Long.class);

    public final NumberPath<Long> quizbookId = createNumber("quizbookId", Long.class);

    public final NumberPath<Long> quizId = createNumber("quizId", Long.class);

    public QQuiz_QuizBook(String variable) {
        super(Quiz_QuizBook.class, forVariable(variable));
    }

    public QQuiz_QuizBook(Path<? extends Quiz_QuizBook> path) {
        super(path.getType(), path.getMetadata());
    }

    public QQuiz_QuizBook(PathMetadata metadata) {
        super(Quiz_QuizBook.class, metadata);
    }

}

