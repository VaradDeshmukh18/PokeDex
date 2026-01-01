package com.example.pokedex.client;

import com.example.pokedex.exception.ExternalApiException;
import com.example.pokedex.exception.PokemonNotFoundException;
import org.springframework.stereotype.Component;
import com.example.pokedex.config.RestTemplateConfig;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class PokemonClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String BASE = "https://pokeapi.co/api/v2/pokemon";

    public Map<String, Object> fetchList(int limit, int offset) {
        return restTemplate.getForObject(
                BASE + "?limit=" + limit + "&offset=" + offset,
                Map.class
        );
    }

    public Map<String, Object> fetchDetail(String name) {
        try {
            return restTemplate.getForObject(BASE + "/" + name, Map.class);
        } catch (Exception e) {
            throw new PokemonNotFoundException(name);
        }
    }
}
