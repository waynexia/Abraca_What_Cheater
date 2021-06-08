var CARD_NUM = 36;
var CARD_KIND = 8;

function reset_remaining_number() {
    for (var i = 1; i <= CARD_KIND; i++) {
        var elem = document.getElementById('r' + i);
        elem.value = i
    }
}

function calculate() {
    let n_unknown = calculate_n_unknown();

    let p = calculate_p(n_unknown);
    let eoh = calculate_eoh(n_unknown, p);

    // display result
    for (var i = 1; i <= CARD_KIND; i++) {
        document.getElementById('p' + i).textContent = to_percent(p[i - 1]);
        document.getElementById('eoh' + i).textContent = eoh[i - 1].toPrecision(4);
    }
}

function calculate_n_unknown() {
    var n_unknown = 0;
    for (var i = 1; i <= CARD_KIND; i++) {
        n_unknown += Number.parseInt(document.getElementById('r' + i).value);
    }

    return n_unknown;
}

// Generating Expect HP affect array based on N_Player.
// (in absolute value)
function generate_eh() {
    let n_player = document.getElementById('n_player').value
    // assert eh.len = CARD_KIND
    var eh = [0, 0, 2, 0, 2, 1, 1, 1];

    eh[0] = 2 * n_player
    eh[1] = n_player

    return eh;

}

// Calculate the presenting probability of each card kind
function calculate_p(n_unknown) {
    var p = [];
    for (var i = 1; i <= CARD_KIND; i++) {
        let n_i = document.getElementById('r' + i).value;
        // document.getElementById('p' + i).textContent = to_percent(n_i / n_unknown);
        p.push(n_i / n_unknown);
    }
    return p;
}

// Calculate the health affect expectation of each operation kind
function calculate_eoh(n_unknown, p) {
    let eh = generate_eh();
    var eoh = [];
    for (var i = 1; i <= CARD_KIND; i++) {
        let eoh_i = p[i - 1] * eh[i - 1] - (1 - p[i - 1])
        eoh.push(eoh_i)
    }

    return eoh;
}

function to_percent(float_value) {
    float_value = float_value.toFixed(4) * 100;
    float_value = float_value.toFixed(2);
    return String(float_value) + '%';
}