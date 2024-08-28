import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  
  const {id} = useParams()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  const [following, setFollowing] = useState(false)

  useEffect(() => {
    async function getData() {
      const response = (await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)).data
      setData(response)
      setLoading(false)
    }
    getData()
  },[])
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? <Skeleton height={100} width={100} borderRadius={100}/>
                      : <img src={data.authorImage} alt="" />}

                      {!loading && <i className="fa fa-check"></i>}
                      {loading ? <Skeleton height={75} width={600} borderRadius={10}/>
                      :
                        <div className="profile_name">
                        <h4>
                          {data.authorName}
                          <span className="profile_username">@{data.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {data.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>}
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {!loading && <div className="profile_follower">{following ? data.followers + 1 : data.followers} followers</div>}
                      <Link to="#" className="btn-main" onClick={() => {
                        setFollowing(prev => !prev)
                      }}>
                        {following && "Un"}Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {loading ? new Array(8).fill(0).map((_,i) => (
                    <Skeleton
                    key={i}
                    height={400}
                    width={300}
                    borderRadius={10}/>))
                    :
                  <AuthorItems data={data.nftCollection}
                  authorImage={data.authorImage}/>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
