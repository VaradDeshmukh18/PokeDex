package com.example.pokedex.dto;

import java.util.List;

public record PokemonDetailDto(
        int id,
        String name,
        String image,
        List<String> types,
        int hp,
        int attack,
        int defense,
        int speed,
        List<String> abilities,
        int height,
        int weight,
        int baseExperience
) {}