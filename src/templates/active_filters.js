export const active_filters_template = {
    expId: "devices_and_circuits-exp6", // Update this if the experiment ID differs
    name: "Active Filters",
    presets: [
        {
            presetId: "low_pass",
            name: "Low Pass Filter",
            description: "Op-Amp configured as an active low pass filter.",
            circuit: {
                components: [
                    { "id": "comp_1", "type": "voltage_source", "x": 320, "y": 280, "rotation": 0, "properties": { "voltage": 5, "type": "dc", "frequency": 50, "phase": 0 }, "state": {} },
                    { "id": "comp_2", "type": "resistor", "x": 400, "y": 200, "rotation": 0, "properties": { "resistance": 1000 }, "state": {} },
                    { "id": "comp_3", "type": "junction", "x": 480, "y": 200, "rotation": 0, "properties": {}, "state": {} },
                    { "id": "comp_4", "type": "opamp", "x": 560, "y": 220, "rotation": 0, "properties": { "openLoopGain": 100000, "gbp": 1000000, "rin": 2000000, "rout": 75, "offsetVoltage": 0, "cmrr": 90, "saturationVoltage": 15 }, "state": {} },
                    { "id": "comp_6", "type": "junction", "x": 660, "y": 220, "rotation": 0, "properties": {}, "state": {} },
                    { "id": "comp_7", "type": "capacitor", "x": 580, "y": 140, "rotation": 0, "properties": { "capacitance": 0.000001 }, "state": { "voltage": 0, "current": 0 } },
                    { "id": "comp_8", "type": "ground", "x": 460, "y": 380, "rotation": 0, "properties": {}, "state": {} },
                    { "id": "comp_10", "type": "resistor", "x": 580, "y": 80, "rotation": 0, "properties": { "resistance": 1000 }, "state": {} },
                    { "id": "comp_11", "type": "oscilloscope", "x": 220, "y": 140, "rotation": 0, "properties": { "ch1Enabled": true, "ch2Enabled": false, "ch1Mode": "Voltage", "ch2Mode": "Voltage", "ch1Label": "CH1", "ch2Label": "CH2" }, "state": {} },
                    { "id": "comp_12", "type": "junction", "x": 220, "y": 40, "rotation": 0, "properties": {}, "state": {} }
                ],
                wires: [
                    { "id": "wire_2", "startTerminal": "comp_1_positive", "endTerminal": "comp_2_left", "points": [{ "x": 320, "y": 250 }, { "x": 320, "y": 250 }, { "x": 320, "y": 200 }, { "x": 370, "y": 200 }] },
                    { "id": "wire_4", "startTerminal": "comp_2_right", "endTerminal": "comp_3_node", "points": [{ "x": 430, "y": 200 }, { "x": 455, "y": 200 }, { "x": 455, "y": 200 }, { "x": 480, "y": 200 }] },
                    { "id": "wire_6", "startTerminal": "comp_3_node", "endTerminal": "comp_4_in_neg", "points": [{ "x": 480, "y": 200 }, { "x": 505, "y": 200 }, { "x": 505, "y": 205 }, { "x": 530, "y": 205 }] },
                    { "id": "wire_12", "startTerminal": "comp_6_node", "endTerminal": "comp_4_out", "points": [{ "x": 660, "y": 220 }, { "x": 625, "y": 220 }, { "x": 625, "y": 220 }, { "x": 590, "y": 220 }] },
                    { "id": "wire_14", "startTerminal": "comp_7_left", "endTerminal": "comp_3_node", "points": [{ "x": 550, "y": 140 }, { "x": 480, "y": 140 }, { "x": 480, "y": 200 }, { "x": 480, "y": 200 }] },
                    { "id": "wire_16", "startTerminal": "comp_7_right", "endTerminal": "comp_6_node", "points": [{ "x": 610, "y": 140 }, { "x": 660, "y": 140 }, { "x": 660, "y": 220 }, { "x": 660, "y": 220 }] },
                    { "id": "wire_18", "startTerminal": "comp_8_ref", "endTerminal": "comp_1_negative", "points": [{ "x": 460, "y": 365 }, { "x": 320, "y": 365 }, { "x": 320, "y": 310 }, { "x": 320, "y": 310 }] },
                    { "id": "wire_20", "startTerminal": "comp_8_ref", "endTerminal": "comp_4_in_pos", "points": [{ "x": 460, "y": 365 }, { "x": 520, "y": 365 }, { "x": 520, "y": 235 }, { "x": 530, "y": 235 }] },
                    { "id": "wire_30", "startTerminal": "comp_10_left", "endTerminal": "comp_3_node", "points": [{ "x": 550, "y": 80 }, { "x": 480, "y": 80 }, { "x": 480, "y": 200 }, { "x": 480, "y": 200 }] },
                    { "id": "wire_32", "startTerminal": "comp_10_right", "endTerminal": "comp_6_node", "points": [{ "x": 610, "y": 80 }, { "x": 660, "y": 80 }, { "x": 660, "y": 220 }, { "x": 660, "y": 220 }] },
                    { "id": "wire_34", "startTerminal": "comp_11_ch2_pos", "endTerminal": "comp_1_positive", "points": [{ "x": 175, "y": 140 }, { "x": 160, "y": 140 }, { "x": 160, "y": 250 }, { "x": 320, "y": 250 }] },
                    { "id": "wire_36", "startTerminal": "comp_11_ch2_neg", "endTerminal": "comp_1_negative", "points": [{ "x": 265, "y": 140 }, { "x": 280, "y": 140 }, { "x": 280, "y": 310 }, { "x": 320, "y": 310 }] },
                    { "id": "wire_38", "startTerminal": "comp_11_ch1_neg", "endTerminal": "comp_8_ref", "points": [{ "x": 220, "y": 175 }, { "x": 220, "y": 175 }, { "x": 220, "y": 365 }, { "x": 460, "y": 365 }] },
                    { "id": "wire_40", "startTerminal": "comp_12_node", "endTerminal": "comp_11_ch1_pos", "points": [{ "x": 220, "y": 40 }, { "x": 220, "y": 40 }, { "x": 220, "y": 105 }, { "x": 220, "y": 105 }] },
                    { "id": "wire_42", "startTerminal": "comp_12_node", "endTerminal": "comp_6_node", "points": [{ "x": 220, "y": 40 }, { "x": 660, "y": 40 }, { "x": 660, "y": 220 }, { "x": 660, "y": 220 }] }
                ]
            },
            simulation: {
                route: "default",
                simulationId: "low_pass_sim",
                simulationType: "Frequency"
            }
        },
        {
            presetId: "high_pass",
            name: "High Pass Filter",
            description: "Op-Amp configured as an active high pass filter.",
            circuit: {
                components: [
                    { "id": "comp_1", "type": "voltage_source", "x": 260, "y": 280, "rotation": 0, "properties": { "voltage": 5, "type": "ac", "frequency": 50, "phase": 0 }, "state": {} },
                    { "id": "comp_2", "type": "resistor", "x": 320, "y": 200, "rotation": 0, "properties": { "resistance": 5600 }, "state": {} },
                    { "id": "comp_3", "type": "junction", "x": 480, "y": 200, "rotation": 0, "properties": {}, "state": {} },
                    { "id": "comp_4", "type": "opamp", "x": 600, "y": 220, "rotation": 0, "properties": { "openLoopGain": 100000, "gbp": 1000000, "rin": 2000000, "rout": 75, "offsetVoltage": 0, "cmrr": 90, "saturationVoltage": 15 }, "state": {} },
                    { "id": "comp_6", "type": "junction", "x": 660, "y": 220, "rotation": 0, "properties": {}, "state": {} },
                    { "id": "comp_8", "type": "ground", "x": 460, "y": 380, "rotation": 0, "properties": {}, "state": {} },
                    { "id": "comp_10", "type": "resistor", "x": 580, "y": 140, "rotation": 0, "properties": { "resistance": 56000 }, "state": {} },
                    { "id": "comp_11", "type": "oscilloscope", "x": 160, "y": 140, "rotation": 0, "properties": { "ch1Enabled": true, "ch2Enabled": false, "ch1Mode": "Voltage", "ch2Mode": "Voltage", "ch1Label": "CH1", "ch2Label": "CH2" }, "state": {} },
                    { "id": "comp_12", "type": "junction", "x": 220, "y": 40, "rotation": 0, "properties": {}, "state": {} },
                    { "id": "comp_13", "type": "capacitor", "x": 420, "y": 200, "rotation": 0, "properties": { "capacitance": 2.8e-9 }, "state": { "voltage": 0, "current": 0 } }
                ],
                wires: [
                    { "id": "wire_2", "startTerminal": "comp_1_positive", "endTerminal": "comp_2_left", "points": [{ "x": 260, "y": 250 }, { "x": 260, "y": 250 }, { "x": 260, "y": 200 }, { "x": 290, "y": 200 }] },
                    { "id": "wire_6", "startTerminal": "comp_3_node", "endTerminal": "comp_4_in_neg", "points": [{ "x": 480, "y": 200 }, { "x": 525, "y": 200 }, { "x": 525, "y": 205 }, { "x": 570, "y": 205 }] },
                    { "id": "wire_12", "startTerminal": "comp_6_node", "endTerminal": "comp_4_out", "points": [{ "x": 660, "y": 220 }, { "x": 645, "y": 220 }, { "x": 645, "y": 220 }, { "x": 630, "y": 220 }] },
                    { "id": "wire_18", "startTerminal": "comp_8_ref", "endTerminal": "comp_1_negative", "points": [{ "x": 460, "y": 365 }, { "x": 260, "y": 365 }, { "x": 260, "y": 310 }, { "x": 260, "y": 310 }] },
                    { "id": "wire_20", "startTerminal": "comp_8_ref", "endTerminal": "comp_4_in_pos", "points": [{ "x": 460, "y": 365 }, { "x": 520, "y": 365 }, { "x": 520, "y": 235 }, { "x": 570, "y": 235 }] },
                    { "id": "wire_30", "startTerminal": "comp_10_left", "endTerminal": "comp_3_node", "points": [{ "x": 550, "y": 140 }, { "x": 480, "y": 140 }, { "x": 480, "y": 200 }, { "x": 480, "y": 200 }] },
                    { "id": "wire_32", "startTerminal": "comp_10_right", "endTerminal": "comp_6_node", "points": [{ "x": 610, "y": 140 }, { "x": 660, "y": 140 }, { "x": 660, "y": 220 }, { "x": 660, "y": 220 }] },
                    { "id": "wire_34", "startTerminal": "comp_11_ch2_pos", "endTerminal": "comp_1_positive", "points": [{ "x": 115, "y": 140 }, { "x": 80, "y": 140 }, { "x": 80, "y": 250 }, { "x": 260, "y": 250 }] },
                    { "id": "wire_36", "startTerminal": "comp_11_ch2_neg", "endTerminal": "comp_1_negative", "points": [{ "x": 205, "y": 140 }, { "x": 220, "y": 140 }, { "x": 220, "y": 310 }, { "x": 260, "y": 310 }] },
                    { "id": "wire_38", "startTerminal": "comp_11_ch1_neg", "endTerminal": "comp_8_ref", "points": [{ "x": 160, "y": 175 }, { "x": 160, "y": 175 }, { "x": 160, "y": 365 }, { "x": 460, "y": 365 }] },
                    { "id": "wire_40", "startTerminal": "comp_12_node", "endTerminal": "comp_11_ch1_pos", "points": [{ "x": 220, "y": 40 }, { "x": 160, "y": 40 }, { "x": 160, "y": 105 }, { "x": 160, "y": 105 }] },
                    { "id": "wire_42", "startTerminal": "comp_12_node", "endTerminal": "comp_6_node", "points": [{ "x": 220, "y": 40 }, { "x": 660, "y": 40 }, { "x": 660, "y": 220 }, { "x": 660, "y": 220 }] },
                    { "id": "wire_45", "startTerminal": "comp_13_left", "endTerminal": "comp_2_right", "points": [{ "x": 390, "y": 200 }, { "x": 370, "y": 200 }, { "x": 370, "y": 200 }, { "x": 350, "y": 200 }] },
                    { "id": "wire_47", "startTerminal": "comp_13_right", "endTerminal": "comp_3_node", "points": [{ "x": 450, "y": 200 }, { "x": 465, "y": 200 }, { "x": 465, "y": 200 }, { "x": 480, "y": 200 }] }
                ]
            },
            simulation: {
                route: "default",
                simulationId: "high_pass_sim",
                simulationType: "Frequency"
            }
        },
        {
            presetId: "band_pass",
            name: "Band Pass / State Variable Filter",
            description: "Op-Amp configured as an inverting state variable or band pass filter.",
            circuit: {
                components: [],
                wires: []
            },
            simulation: {
                route: "default",
                simulationId: "band_pass_sim",
                simulationType: "Frequency"
            }
        }
    ]
};
