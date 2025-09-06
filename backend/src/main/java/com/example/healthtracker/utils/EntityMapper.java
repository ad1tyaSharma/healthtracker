package com.example.healthtracker.utils;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public class EntityMapper {

    public static Map<String, String> toNonNullStringMap(Object obj) {
        Map<String, String> map = new HashMap<>();
        if (obj == null) return map;

        try {
            for (Field field : obj.getClass().getDeclaredFields()) {
                field.setAccessible(true);
                Object value = field.get(obj);

                if (value != null) {
                    if (value instanceof String str && str.isBlank()) {
                        continue; // skip empty strings
                    }
                    map.put(field.getName(), value.toString());
                }
            }
        } catch (IllegalAccessException e) {
            throw new RuntimeException("Error mapping object to map", e);
        }

        return map;
    }
}

