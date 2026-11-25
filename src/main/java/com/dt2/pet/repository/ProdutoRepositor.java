package com.dt2.pet.repository;

import com.dt2.pet.enties.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepositor extends JpaRepository<Produto , Integer> {
}
