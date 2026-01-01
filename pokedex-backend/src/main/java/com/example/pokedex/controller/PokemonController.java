package com.example.pokedex.controller;

import com.example.pokedex.dto.PokemonDetailDto;
import com.example.pokedex.dto.PokemonListResponse;
import com.example.pokedex.service.PokemonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pokemon")
@CrossOrigin
public class PokemonController {

    private final PokemonService service;

    public PokemonController(PokemonService service) {
        this.service = service;
    }

    @GetMapping
    public PokemonListResponse list(
            @RequestParam int limit,
            @RequestParam int offset
    ) {
        return service.listPokemon(limit, offset);
    }

    @GetMapping("/{name}")
    public PokemonDetailDto detail(@PathVariable String name) {
        return service.getPokemon(name);
    }
}