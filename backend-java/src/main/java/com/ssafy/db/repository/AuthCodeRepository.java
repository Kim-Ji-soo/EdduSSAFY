package com.ssafy.db.repository;

import com.ssafy.db.entity.AuthCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthCodeRepository extends JpaRepository <AuthCode, String> {
}
