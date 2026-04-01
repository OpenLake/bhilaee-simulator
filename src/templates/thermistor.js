export const thermistor_template = {
  "components": [
    {
      "id": "comp_62",
      "type": "voltage_source",
      "x": 220,
      "y": 180,
      "rotation": 0,
      "properties": {
        "voltage": 1,
        "type": "dc",
        "frequency": 50,
        "phase": 0
      },
      "state": {}
    },
    {
      "id": "comp_63",
      "type": "ground",
      "x": 400,
      "y": 320,
      "rotation": 0,
      "properties": {},
      "state": {}
    },
    {
      "id": "comp_64",
      "type": "voltmeter",
      "x": 560,
      "y": 180,
      "rotation": 90,
      "properties": {
        "voltage": 0
      }
    },
    {
      "id": "comp_66",
      "type": "thermistor",
      "x": 400,
      "y": 180,
      "rotation": 0,
      "properties": {
        "r0": 10000,
        "bConstant": 3950,
        "t0": 25,
        "ambientTemp": 25,
        "timeConstant": 3,
        "heaterGain": 60,
        "maxTemp": 200
      },
      "state": {}
    }
  ],
  "wires": [
    {
      "id": "wire_7",
      "startTerminal": "comp_62_negative",
      "endTerminal": "comp_63_ref",
      "points": [
        {
          "x": 220,
          "y": 210
        },
        {
          "x": 220,
          "y": 210
        },
        {
          "x": 220,
          "y": 305
        },
        {
          "x": 400,
          "y": 305
        }
      ]
    },
    {
      "id": "wire_13",
      "startTerminal": "comp_63_ref",
      "endTerminal": "comp_64_negative",
      "points": [
        {
          "x": 400,
          "y": 305
        },
        {
          "x": 560,
          "y": 305
        },
        {
          "x": 560,
          "y": 210
        },
        {
          "x": 560,
          "y": 210
        }
      ]
    },
    {
      "id": "wire_24",
      "startTerminal": "comp_62_positive",
      "endTerminal": "comp_66_exc_pos",
      "points": [
        {
          "x": 220,
          "y": 150
        },
        {
          "x": 272.5,
          "y": 150
        },
        {
          "x": 272.5,
          "y": 160
        },
        {
          "x": 325,
          "y": 160
        }
      ]
    },
    {
      "id": "wire_26",
      "startTerminal": "comp_66_exc_neg",
      "endTerminal": "comp_62_negative",
      "points": [
        {
          "x": 325,
          "y": 200
        },
        {
          "x": 272.5,
          "y": 200
        },
        {
          "x": 272.5,
          "y": 210
        },
        {
          "x": 220,
          "y": 210
        }
      ]
    },
    {
      "id": "wire_28",
      "startTerminal": "comp_66_out_pos",
      "endTerminal": "comp_64_positive",
      "points": [
        {
          "x": 475,
          "y": 160
        },
        {
          "x": 517.5,
          "y": 160
        },
        {
          "x": 517.5,
          "y": 150
        },
        {
          "x": 560,
          "y": 150
        }
      ]
    },
    {
      "id": "wire_30",
      "startTerminal": "comp_66_out_neg",
      "endTerminal": "comp_64_negative",
      "points": [
        {
          "x": 475,
          "y": 200
        },
        {
          "x": 517.5,
          "y": 200
        },
        {
          "x": 517.5,
          "y": 210
        },
        {
          "x": 560,
          "y": 210
        }
      ]
    }
  ]
};
