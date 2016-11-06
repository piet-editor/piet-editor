import React from 'react';
import Loader from 'piet-loader-canvas';

export default class Import extends React.Component {
  constructor(props) {
    super(props);

    this.importImage = this.importImage.bind(this);
  }

  importImage() {
    const file = this.file.files[0];
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');
    const cs = this.props.cs;
    if (!file || !file.type.match(/^image\/(png|jpeg|gif)$/)) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const code = Loader.load(ctx, cs); // なんでここpromiseが帰ってこないの？
      const size = {
        width: image.width / cs,
        height: image.height / cs,
      };
      if (size.width !== (size.width | 0) || size.height !== (size.height | 0)) {
        console.warn(`codel size may wrong? width: ${size.width}, height: ${size.height}, codel size: ${cs}`);
      }
      this.props.importCanvas(code, size);
    };
  }

  render() {
    return (
      <div>
        <input
          type='file'
          accept='image/*'
          ref={(n) => (this.file = n)}
        />
        <button type='submit' onClick={this.importImage}>Import</button>
        <canvas
          style={{ display: 'none' }}
          ref={(n) => (this.canvas = n)}
        />
      </div>
    );
  }
}

Import.propTypes = {
  cs: React.PropTypes.number.isRequired,
  importCanvas: React.PropTypes.func.isRequired,
};
