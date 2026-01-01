package com.example.pokedex.service;

import com.example.pokedex.client.PokemonClient;
import com.example.pokedex.dto.PokemonDetailDto;
import com.example.pokedex.dto.PokemonListItemDto;
import com.example.pokedex.dto.PokemonListResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PokemonService {

    private final PokemonClient client;

    public PokemonService(PokemonClient client) {
        this.client = client;
    }

    // LIST
    public PokemonListResponse listPokemon(int limit, int offset) {

        Map<String, Object> response = client.fetchList(limit, offset);
        List<Map<String, String>> results =
                (List<Map<String, String>>) response.get("results");

        List<PokemonListItemDto> list = results.stream()
                .map(p -> {
                    int id = extractId(p.get("url"));
                    return new PokemonListItemDto(
                            id,
                            p.get("name"),
                            imageFromId(id)
                    );
                }).toList();

        return new PokemonListResponse(
                (int) response.get("count"),
                list
        );
    }

    // DETAIL
    public PokemonDetailDto getPokemon(String name) {

        Map<String, Object> d = client.fetchDetail(name);

        List<Map<String, Object>> stats =
                (List<Map<String, Object>>) d.get("stats");

        return new PokemonDetailDto(
                (int) d.get("id"),
                d.get("name").toString(),
                extractImage(d),
                extractList(d, "types", "type"),
                (int) stats.get(0).get("base_stat"),
                (int) stats.get(1).get("base_stat"),
                (int) stats.get(2).get("base_stat"),
                (int) stats.get(5).get("base_stat"),
                extractList(d, "abilities", "ability"),
                (int) d.get("height"),
                (int) d.get("weight"),
                (int) d.get("base_experience")
        );
    }

    // Helpers
    private int extractId(String url) {
        String[] p = url.split("/");
        return Integer.parseInt(p[p.length - 1]);
    }

    private String imageFromId(int id) {
        return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
                + id + ".png";
    }

    private String extractImage(Map<String, Object> d) {
        return ((Map<String, Object>)
                ((Map<String, Object>)
                        ((Map<String, Object>) d.get("sprites"))
                                .get("other"))
                        .get("official-artwork"))
                .get("front_default").toString();
    }

    private List<String> extractList(
            Map<String, Object> d,
            String key,
            String inner
    ) {
        return ((List<Map<String, Object>>) d.get(key))
                .stream()
                .map(m -> ((Map<String, Object>) m.get(inner))
                        .get("name").toString())
                .toList();
    }
}
