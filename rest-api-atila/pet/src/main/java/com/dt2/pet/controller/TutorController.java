package com.dt2.pet.controller;

import com.dt2.pet.enties.Tutor;
import com.example.restapiatila.model.Tutor;
import com.example.restapiatila.repository.TutorRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/tutores")
public class TutorController {

    private final TutorRepository repository;

    public TutorController(TutorRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Tutor> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Tutor buscar(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    @PostMapping
    public Tutor salvar(@RequestBody Tutor tutor) {
        return repository.save(tutor);
    }

    @PutMapping("/{id}")
    public Tutor atualizar(@PathVariable Long id, @RequestBody Tutor tutor) {
        Tutor tu = repository.findById(id).orElseThrow();

        tu.setNome(tutor.getNome());
        tu.setEmail(tutor.getEmail());
        tu.setTelefone(tutor.getTelefone());
        tu.setEndereco(tutor.getEndereco());

        return repository.save(existente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
