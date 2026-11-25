package com.dt2.pet.controller;

import com.dt2.pet.enties.Produto;
import com.dt2.pet.repository.ProdutoRepositor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/petshop")
public class ProdutoController {
    private final ProdutoRepositor repository;
   public ProdutoController (ProdutoRepositor repository){
       this.repository= repository;
   }
    @GetMapping
    public List<Produto> mostrar(){
        return repository.findAll();
    }
    @PostMapping
    public String adicionarProduto(@RequestBody Produto produto){
       try {
           repository.save(produto);
           return "produto criado com sucesso";
       } catch (Exception e) {
           return "dados incorretos";
       }
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable int id){
       try {
           repository.deleteById(id);
           return "excluido com sucesso!";
       } catch (Exception e) {
           return "não foi possivel excluir!";
       }
    }

    @PutMapping("/{id}")
    public void atualizar(@PathVariable int id , @RequestBody Produto p){
       Produto produto=repository.getReferenceById(id);
       produto.setNome(p.getNome());
       produto.setCategoria(p.getCategoria());
       produto.setValor(p.getValor());
       produto.setFabricante(p.getFabricante());
    }
}
