import { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
    constructor(props) {
        super(props);
        // Create a div that we'll render the modal into. Because each
        // Modal component has its own element, we can render multiple
        // modal components into the modal container.
        this.el = document.createElement('div');
    }

    componentDidMount() {
        // Append the element into the DOM on mount. We'll render
        // into the modal container element (see the HTML tab).
        modalRoot.appendChild(this.el);
        var modalButton = document.getElementById('modalButton');
        modalButton.setAttribute("style",`top: ${this.props.position.y}px; left: ${this.props.position.x + 100}px;`)
        // modalButton.style.left = this.props.position.x;
    }

    componentWillUnmount() {
        // Remove the element from the DOM when we unmount
        modalRoot.removeChild(this.el);
    }

    render() {
        // Use a portal to render the children into the element
        return ReactDOM.createPortal(
        // Any valid React child: JSX, strings, arrays, etc.
        this.props.children,
        // A DOM element
        this.el,
        );
    }
}

export default Modal;

// helper function to get an element's exact position
function getPosition(el) {
    var xPosition = 0;
    var yPosition = 0;
   
    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
        var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
   
        xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
        yPosition += (el.offsetTop - yScrollPos + el.clientTop);
      } else {
        xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
      }
   
      el = el.offsetParent;
    }
    return {
      x: xPosition,
      y: yPosition
    };
  }