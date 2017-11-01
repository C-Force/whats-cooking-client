//url: danibram.github.io/mocker-data-generateor
var dish = {
    id: {
        chance: 'guid'
    },
    name: {
        faker: 'random.word'
    },
    image: {
        faker: 'image.food'
    },
    nurition_facts: {
        serving_size: {
            type: {
                values: ['slice', 'tablespoon', 'cup', 'ounce', '3oz', 'each']
            },
            weight: {
                chance: 'integer({min: 0, max: 200})'
            }
        },
        calories: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
        },
        calories_from_fat: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
        },
        total_fat: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})',
            }
        },
        saturated_fat: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        cholesterol: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})',
            },
        },
        sodium: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        total_carbohydrate: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        dietary_fiber: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        sugars: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
        },
        protein: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        vitamin_a: {
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        vitamin_c: {
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        calcium: {
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        iron: {
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        }
    },
    ingredients: {
        faker: 'lorem.text'
    },
    contains: {
        faker: 'lorem.text'
    },
    vegetarian: {
        faker: 'random.boolean'
    },
    vegan: {
        faker: 'random.boolean'
    },
}

var cafe = {
    id: {
        chance: 'guid'
    },
    name: {
        faker: 'random.word'
    },
    dishes: {
        hasMany: 'dish',
        min: 0,
        max: 5
    }
}

var facility = {
    name: {
        values: ['brody', 'wilson', 'case', 'holden', 'akers', 'landon', 'shaw', 'holmes']
    },
    location: {
        faker: 'random.word'
    },
    mealtime: {
        breakfast: {
            hasMany: 'cafe',
            max: 5,
            min: 0
        },
        lunch: {
            hasMany: 'cafe',
            max: 5,
            min: 0
        },
        dinner: {
            hasMany: 'cafe',
            max: 5,
            min: 0
        },
        late_dinner: {
            hasMany: 'cafe',
            max: 5,
            min: 0
        },
    }
}



var menu = {
    date: {
        chance: 'date',
    },
    facilities: {
        hasMany: 'facility',
        uniqueField: 'name',
        min: 5
    }
}

mocker()
    .schema('dish', dish, 100)
    .schema('cafe', cafe, 20)
    .schema('facility', facility, { uniqueField: 'name'})
    .schema('menus', menu, 2)

var dish = {
    id: {
        chance: 'guid'
    },
    name: {
        faker: 'random.word'
    },
    image: {
        function: function() {
            return 'assets/imgs/food-0' + this.chance.integer({min: 0, max: 9}) + '.jpeg';
        }
    },
    nurition_facts: {
        serving_size: {
            type: {
                values: ['slice', 'tablespoon', 'cup', 'ounce', '3oz', 'each']
            },
            weight: {
                chance: 'integer({min: 0, max: 200})'
            }
        },
        calories: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
        },
        calories_from_fat: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
        },
        total_fat: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})',
            }
        },
        saturated_fat: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        cholesterol: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})',
            },
        },
        sodium: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        total_carbohydrate: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        dietary_fiber: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        sugars: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
        },
        protein: {
            weight: {
                chance: 'integer({min: 0, max: 200})'
            },
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        vitamin_a: {
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        vitamin_c: {
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        calcium: {
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        },
        iron: {
            daily_value: {
                chance: 'floating({min: 0, max: 1, fixed: 2})'
            }
        }
    },
    ingredients: {
        faker: 'lorem.text'
    },
    contains: {
        faker: 'lorem.text'
    },
    vegetarian: {
        faker: 'random.boolean'
    },
    vegan: {
        faker: 'random.boolean'
    },
    location: {
        values: ['brody', 'wilson', 'case', 'holden', 'akers', 'landon', 'shaw', 'holmes']
    },
    mealtime: {
        values: ['Breakfast', 'Lunch', 'Dinner', 'Late Dinner']
    },
    cafe: {
        values: ['Boiling Point', 'Brimstone', 'Cayenne\'s', 'Ciao!', 'Homestyle', 'Pangea', 'S2', 'Soup', 'Veg Out']
    }
}

