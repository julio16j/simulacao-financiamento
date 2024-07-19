function calcularPMT(valorFinanciamento, taxaJuros, numeroParcelas) {
    return valorFinanciamento * (taxaJuros * Math.pow(1 + taxaJuros, numeroParcelas)) / (Math.pow(1 + taxaJuros, numeroParcelas) - 1);
}

function rodarSimulacao() {
    const valorFinanciamento = parseFloat(document.getElementById('valorFinanciamento').value);
    const taxaJuros = parseFloat(document.getElementById('taxaJuros').value);
    const numeroParcelas = parseInt(document.getElementById('numeroParcelas').value);
    const amortizacaoMensal = parseFloat(document.getElementById('amortizacaoMensal').value);

    const pmtInicial = calcularPMT(valorFinanciamento, taxaJuros, numeroParcelas);

    const saldosDevedores = [];
    const parcelas = [];
    let saldoDevedor = valorFinanciamento;

    for (let mes = 1; mes <= numeroParcelas; mes++) {
        const jurosMes = saldoDevedor * taxaJuros;
        const prestacaoMes = pmtInicial;
        const amortizacaoMes = prestacaoMes - jurosMes;
        saldoDevedor -= amortizacaoMes + amortizacaoMensal;
        saldosDevedores.push(saldoDevedor);
        parcelas.push(mes);
        if (saldoDevedor <= 0) {
            break;
        }
    }

    const novoNumeroParcelas = parcelas.length;
    const valorTotalPago = novoNumeroParcelas * (pmtInicial + amortizacaoMensal);

    document.getElementById('resultado').innerHTML = `
        <p>Número de Parcelas: ${novoNumeroParcelas}</p>
        <p>Prestação Inicial: ${pmtInicial.toFixed(2)}</p>
        <p>Valor Total Pago: ${valorTotalPago.toFixed(2)}</p>
    `;
}
