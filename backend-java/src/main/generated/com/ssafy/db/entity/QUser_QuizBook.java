package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser_QuizBook is a Querydsl query type for User_QuizBook
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser_QuizBook extends EntityPathBase<User_QuizBook> {

    private static final long serialVersionUID = -1772352400L;

    public static final QUser_QuizBook user_QuizBook = new QUser_QuizBook("user_QuizBook");

    public final NumberPath<Long> pk = createNumber("pk", Long.class);

    public final NumberPath<Long> quizbookId = createNumber("quizbookId", Long.class);

    public final StringPath userId = createString("userId");

    public QUser_QuizBook(String variable) {
        super(User_QuizBook.class, forVariable(variable));
    }

    public QUser_QuizBook(Path<? extends User_QuizBook> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser_QuizBook(PathMetadata metadata) {
        super(User_QuizBook.class, metadata);
    }

}

