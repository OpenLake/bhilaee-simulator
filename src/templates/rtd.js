export const rtd_template = {
  "components": [
    {
      "id": "comp_62",
      "type": "voltage_source",
      "x": 220,
      "y": 200,
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
      "y": 200,
      "rotation": 90,
      "properties": {
        "voltage": 0
      }
    },
    {
      "id": "comp_65",
      "type": "rtd",
      "x": 400,
      "y": 200,
      "rotation": 0,
      "properties": {
        "r0": 100,
        "alpha": 0.00385,
        "tRef": 0,
        "ambientTemp": 25,
        "timeConstant": 3,
        "heaterGain": 60,
        "maxTemp": 300
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
          "y": 230
        },
        {
          "x": 220,
          "y": 230
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
          "y": 230
        },
        {
          "x": 560,
          "y": 230
        }
      ]
    },
    {
      "id": "wire_15",
      "startTerminal": "comp_62_positive",
      "endTerminal": "comp_65_exc_pos",
      "points": [
        {
          "x": 220,
          "y": 170
        },
        {
          "x": 272.5,
          "y": 170
        },
        {
          "x": 272.5,
          "y": 180
        },
        {
          "x": 325,
          "y": 180
        }
      ]
    },
    {
      "id": "wire_17",
      "startTerminal": "comp_62_negative",
      "endTerminal": "comp_65_exc_neg",
      "points": [
        {
          "x": 220,
          "y": 230
        },
        {
          "x": 272.5,
          "y": 230
        },
        {
          "x": 272.5,
          "y": 220
        },
        {
          "x": 325,
          "y": 220
        }
      ]
    },
    {
      "id": "wire_20",
      "startTerminal": "comp_65_out_pos",
      "endTerminal": "comp_64_positive",
      "points": [
        {
          "x": 475,
          "y": 180
        },
        {
          "x": 517.5,
          "y": 180
        },
        {
          "x": 517.5,
          "y": 170
        },
        {
          "x": 560,
          "y": 170
        }
      ]
    },
    {
      "id": "wire_22",
      "startTerminal": "comp_65_out_neg",
      "endTerminal": "comp_64_negative",
      "points": [
        {
          "x": 475,
          "y": 220
        },
        {
          "x": 517.5,
          "y": 220
        },
        {
          "x": 517.5,
          "y": 230
        },
        {
          "x": 560,
          "y": 230
        }
      ]
    }
  ]
};
