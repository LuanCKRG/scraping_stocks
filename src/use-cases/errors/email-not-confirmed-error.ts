export class EmailNotConfirmedError extends Error {
  constructor() {
    super('Verifique seua caixa de entrada')
  }
}