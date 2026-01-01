package com.example.pokedex.dto;

import java.util.List;

public record PokemonListResponse(
        int count,
        List<PokemonListItemDto> results
) {}
