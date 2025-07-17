// Script para converter CSV de perguntas para JSON
// Use este script se quiser gerenciar as perguntas via planilha

class PerguntasCSVConverter {
  constructor() {
    this.perguntas = [];
  }

  // Converter CSV para JSON
  csvToJson(csvContent) {
    const lines = csvContent.trim().split("\n");
    const headers = lines[0].split(",");

    // Ignorar primeira coluna (labels) e pegar apenas as colunas de dados
    const dataColumns = headers.slice(2);

    // Processar cada pergunta (coluna)
    dataColumns.forEach((_, colIndex) => {
      const perguntaData = {};

      // Ler cada linha para esta pergunta
      for (let rowIndex = 1; rowIndex < lines.length; rowIndex++) {
        const cells = lines[rowIndex].split(",");
        const property = cells[0]; // Nome da propriedade
        const value = cells[colIndex + 2]; // Valor para esta pergunta (+2 para pular primeira coluna e header)

        perguntaData[property] = value;
      }

      // Converter para formato esperado
      const pergunta = this.convertToExpectedFormat(perguntaData, colIndex + 1);
      this.perguntas.push(pergunta);
    });

    return {
      perguntas: this.perguntas,
    };
  }

  // Converter dados do CSV para formato esperado
  convertToExpectedFormat(data, id) {
    return {
      id: id,
      pergunta: data.pergunta || `Pergunta ${id}`,
      rectangle1_background_color:
        this.colorNameToHex(data["rectangle1_background-color"]) || "#f4750d",
      rectangle2_background_color:
        this.colorNameToHex(data["rectangle2_background-color"]) || "#fcfc00",
      resposta_correta: data.resposta === "sim" ? "sim" : "nao",
      ilustracao: data.ilustacao
        ? `${data.ilustacao.padStart(2, "0")}.png`
        : `${id.toString().padStart(2, "0")}.png`,
      opcoes: {
        sim: "PODE",
        nao: "NÃO PODE",
      },
    };
  }

  // Converter nomes de cores para hex
  colorNameToHex(colorName) {
    const colorMap = {
      azul: "#2196f3",
      verde: "#4caf50",
      vermelho: "#f44336",
      amarelo: "#ffeb3b",
      roxo: "#9c27b0",
      rosa: "#e91e63",
      laranja: "#ff9800",
      cinza: "#9e9e9e",
      preto: "#000000",
      branco: "#ffffff",
    };

    return colorMap[colorName?.toLowerCase()] || colorName;
  }

  // Método para usar no navegador
  processCSVFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csvContent = e.target.result;
          const json = this.csvToJson(csvContent);
          resolve(json);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
}

// Exemplo de uso:
// const converter = new PerguntasCSVConverter();
// const json = converter.csvToJson(csvString);
// console.log(JSON.stringify(json, null, 2));

// Para usar no navegador com upload de arquivo:
/*
<input type="file" id="csvFile" accept=".csv">
<script>
document.getElementById('csvFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    const converter = new PerguntasCSVConverter();
    try {
      const json = await converter.processCSVFile(file);
      console.log(JSON.stringify(json, null, 2));
      // Salvar o JSON ou usar conforme necessário
    } catch (error) {
      console.error('Erro ao processar CSV:', error);
    }
  }
});
</script>
*/

// Exportar para uso em Node.js (se necessário)
if (typeof module !== "undefined" && module.exports) {
  module.exports = PerguntasCSVConverter;
}
