import React from 'react';
import ExpiryCountdown from "../UI/ExpiryCountdown"
import { Link } from 'react-router-dom';

const NftDisplayCard = ({elm, isHome}) => {
    return (
        <>
            <div
            key={elm.id}
            className={`d-item ${!isHome && "col-lg-3 col-md-6 col-sm-6 col-xs-12"}`}
            style={{ display: "block", backgroundSize: "cover" }}
            >
            <div className="nft__item">
                <div className="author_list_pp">
                <Link
                    to={`/author/${elm.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                >
                    <img className="lazy" src={elm.authorImage} alt={elm.authorId} />
                    <i className="fa fa-check"></i>
                </Link>
                </div>
                
                <ExpiryCountdown expiryDate={elm.expiryDate}/>

                <div className="nft__item_wrap">
                <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                        </a>
                    </div>
                    </div>
                </div>
                <Link to={`/item-details/${elm.nftId}`}>
                    <img src={elm.nftImage} className="lazy nft__item_preview" alt={elm.nftId} />
                </Link>
                </div>
                <div className="nft__item_info">
                <Link to={`/item-details/${elm.nftId}`}>
                    <h4>{elm.title}</h4>
                </Link>
                <div className="nft__item_price">{elm.price} ETH</div>
                <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{elm.likes}</span>
                </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default NftDisplayCard;
