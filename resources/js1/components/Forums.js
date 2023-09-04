import React from 'react'

export default function Forums() {
    return (
        <div className="posts__item bg-f2f4f6">
            <div className="posts__section-left">
                <div className="posts__topic">
                    <div className="posts__content">
                        <a href="#">
                            <h3>Get your username drawn by the other users of unity! or a drawing based on what you do</h3>
                        </a>
                        <div className="posts__tags tags">
                            <a href="#" className="bg-4f80b0">gaming</a>
                            <a href="#" className="bg-424ee8">nature</a>
                            <a href="#" className="bg-36b7d7">entertainment</a>
                        </div>
                    </div>
                </div>
                <div className="posts__category"><a href="#" className="category"><i className="bg-4436f8"></i>Video</a></div>
            </div>
            <div className="posts__section-right">
                <div className="posts__users">
                    <div>
                        <a href="#" className="avatar"><img src="fonts/icons/avatars/L.svg" alt="avatar" /></a>
                    </div>
                    <div>
                        <a href="#" className="avatar"><img src="fonts/icons/avatars/T.svg" alt="avatar" /></a>
                    </div>
                </div>
                <div className="posts__replies">252</div>
                <div className="posts__views">396</div>
                <div className="posts__activity">13m</div>
            </div>
        </div>
    )
}