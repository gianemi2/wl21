const totalMatch = 20;
const winPoint = 4;
const lossPoint = 1;

function calculateScore(remainingMatch, currentPoints) {
    const playedMatch = totalMatch - remainingMatch;
    let wins = 0;
    let loss = playedMatch;
    let resultFound = false;
    let error = false;
    let total = 0;

    while (!resultFound && !error) {
        for (loss = playedMatch; loss >= 0; loss--) {
            total = (loss * lossPoint) + (wins * winPoint)
            resultFound = (total === currentPoints && loss + wins === playedMatch) ? true : false;
            console.log(`Risultato trovato: ${resultFound}. Vittorie: ${wins}. Sconfitte: ${loss}`)

            if (resultFound) {
                break;
            }
        }
        if (!resultFound) {
            loss -= 1;
            wins += 1;
        }
        if (loss < 0) loss = playedMatch;
        if (wins > totalMatch && !resultFound) {
            error = true;
        }
    }

    return { wins, loss, error }
}
export default calculateScore