package com.dt2.pet.controller;

import com.dt2.pet.enties.Vacina;
import com.example.restapiatila.model.Vacina;
import com.example.restapiatila.repository.VacinaRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/vacinas")
@CrossOrigin(origins = "*")
public class VacinaController {

    private final VacinaRepository repository;

    public VacinaController(VacinaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Vacina> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Vacina buscar(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    @PostMapping
    public Vacina salvar(@RequestBody Vacina vacina) {
        return repository.save(vacina);
    }

    @PutMapping("/{id}")
    public Vacina atualizar(@PathVariable Long id,
                            @RequestBody Vacina vacina) {

        Vacina vac = repository.findById(id).orElseThrow();

        vac.setPetId(vacina.getPetId());
        vac.setNome(vacina.getNome());
        vac.setFabricante(vacina.getFabricante());
        vac.setDataAplicacao(vacina.getDataAplicacao());
        vac.setProximaDose(vacina.getProximaDose());

        return repository.save(existente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}