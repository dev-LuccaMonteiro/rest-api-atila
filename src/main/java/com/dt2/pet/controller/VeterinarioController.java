package com.dt2.pet.controller;

import com.dt2.pet.enties.Veterinario;
import com.example.restapiatila.model.Veterinario;
import com.example.restapiatila.repository.VeterinarioRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/veterinarios")
@CrossOrigin(origins = "*")
public class VeterinarioController {

    private final VeterinarioRepository repository;

    public VeterinarioController(VeterinarioRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Veterinario> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Veterinario buscar(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    @PostMapping
    public Veterinario salvar(@RequestBody Veterinario veterinario) {
        return repository.save(veterinario);
    }

    @PutMapping("/{id}")
    public Veterinario atualizar(@PathVariable Long id,
                                 @RequestBody Veterinario veterinario) {

        Veterinario vet = repository.findById(id).orElseThrow();

        vet.setNome(veterinario.getNome());
        vet.setCrmv(veterinario.getCrmv());
        vet.setEspecialidade(veterinario.getEspecialidade());
        vet.setTelefone(veterinario.getTelefone());

        return repository.save(existente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
