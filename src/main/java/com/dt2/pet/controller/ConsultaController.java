package com.dt2.pet.controller;

import com.dt2.pet.enties.Consulta;
import com.dt2.pet.repository.ConsultaRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/consultas")
@CrossOrigin(origins = "*")
public class ConsultaController {

    private final ConsultaRepository repository;

    public ConsultaController(ConsultaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Consulta> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Consulta buscar(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    @PostMapping
    public Consulta salvar(@RequestBody Consulta consulta) {
        return repository.save(consulta);
    }

    @PutMapping("/{id}")
    public Consulta atualizar(@PathVariable Long id,
                              @RequestBody Consulta consulta) {

        Consulta con = repository.findById(id).orElseThrow();

        con.setPetId(consulta.getPetId());
        con.setVeterinarioId(consulta.getVeterinarioId());
        con.setData(consulta.getData());
        con.setDescricao(consulta.getDescricao());
        con.setStatus(consulta.getStatus());

        return repository.save(con);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
