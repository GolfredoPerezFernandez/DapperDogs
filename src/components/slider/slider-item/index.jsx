import React , {useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/scss/modal-video.scss' ;
import { Modal } from "react-bootstrap";
import './styles.scss'

import { useMoralis } from 'react-moralis';
SliderItem.propTypes = {
    item : PropTypes.object,
};

function SliderItem(props) {
    const {item} = props;
    const [isOpen2, setOpen2] = useState(false)

    const [isOpen, setOpen] = useState(false)
    const { Moralis, authenticate,isAuthenticated, enableWeb3, isWeb3EnableLoading, isWeb3Enabled, logout, user } = useMoralis();

    const joinCloseHandler = () => {
        setOpen2(false)
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [isLoading, setLoading] = useState(false)
    const handleAuth = async () => {
        setLoading(true);
        try {
          await enableWeb3();
          const chainId = Moralis.getChainId();
    
          const chainId2 = 14;
          const chainName = 'Songbird Mainnet';
          const currencyName = 'SGB';
          const currencySymbol = 'SGB';
          const rpcUrl = 'https://flare-api.flare.network/ext/C/rpc';
          const blockExplorerUrl = 'https://songbird-explorer.flare.network/';
    
          if ( chainId === '0x13'||chainId === '0xe') {
            await authenticate({
              signingMessage: 'Welcome to TheCooties DAO.',
            });
          } else {
            await Moralis.addNetwork(chainId2, chainName, currencyName, currencySymbol, rpcUrl, blockExplorerUrl);
          }
    
          setLoading(false);
        } catch (e) {
          setLoading(false);
    
        }
      };
    
      const mintModalHandler = () => {
        setOpen2(true);
    };
    // const [modalShow, setModalShow] = useState(false);

    return (
        <div   className={`box-slider ${item.classAction}`}>
            <img className='bg-slider' src={item.bgImg} alt="cybox" />
            <div className="box-slider__main">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="content-box">
                                <h1 className="title">{item.title}</h1>
                                <p className="sub-title">{item.desc}</p>
                                <div className="wrap-btn">
                                    {isAuthenticated===true?                                    <Link onClick={()=> handleShow()} to="#" className="tf-button-st2 btn-effect" data-toggle="modal" data-target="#popup_bid"><span className="effect">Mint NFT</span></Link>
:                                    <Link onClick={handleAuth} to="#" className="tf-button-st2 btn-effect" data-toggle="modal" data-target="#popup_bid"><span className="effect">connect wallet</span></Link>
}
                                    <button to="#" className="tf-button btn-effect popup-youtube" onClick={()=> setOpen(true)}>
                                        <span className="boder-fade"></span>                                     
                                        <span className="effect">watch video</span>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="image">
                                <img src={item.img} alt="cybox" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
         
            <ModalVideo url={"https://bafybeidtdt42ujc5wf2a72ocwhryo6rsr7nym4ycwjfa3dhkchpw3n4jre.ipfs.w3s.link/compressed.mp4"} autoplay isOpen={isOpen}  onClose={() => setOpen(false)} />

            { <Modal
                show={show}
                onHide={handleClose}
            >
            <Modal.Header  closeButton></Modal.Header>

                <div className="modal-body center">
                                   
                                        <h6 className="heading" ><a href="#">COLLECT YOUR NFT</a> </h6>
                                        <p className="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                                        <Link onClick={()=> handleShow()} to="#" className="tf-button-st2 btn-effect" data-toggle="modal" data-target="#popup_bid"><span className="effect">Create New NFT</span></Link>
                                        <p className="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
 </div>
            </Modal>}

            { <div className="modal fade popup" id="popup_bid" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="header-popup">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    
                    
                </div>
            </div>
        </div> }
        </div>
    );
}

export default SliderItem;