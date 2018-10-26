export class Oferta {
    constructor(
        public categoria: string,
        public titulo: string,
        public descricao_oferta: string,
        public anunciante: string,
        public valor: string,
        public destaque: string,
        public pontos_fortes: string,
        public reacao_doencas: string,
        public imagem: Object
    ){}
}