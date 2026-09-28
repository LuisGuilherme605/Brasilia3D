export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <p className="footer-logo">
            Brasília<em>3D</em>
          </p>
          <p>
            Guia independente da capital modernista — fotos, roteiro e uma maquete 3D para explorar
            antes de viajar.
          </p>
        </div>
        <div className="footer-col">
          <h2>Seções</h2>
          <a href="#jornada">Jornada</a>
          <a href="#galeria">Galeria</a>
          <a href="#pontos">Pontos Turísticos</a>
          <a href="#mapa3d">Cidade 3D</a>
          <a href="#dicas">Dicas</a>
        </div>
        <div className="footer-col">
          <h2>Créditos</h2>
          <p>Fotos: Wikimedia Commons (CC BY-SA)</p>
          <p>Dados turísticos: Secretaria de Turismo do DF</p>
          <p>Pôster: série Capital Modernista</p>
        </div>
      </div>
    </footer>
  );
}
