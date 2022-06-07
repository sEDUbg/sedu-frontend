import { Hits, InstantSearch, SearchBox, connectHighlight } from "react-instantsearch-dom";
import algoliasearch from 'algoliasearch/lite';
import { getDoc, doc } from 'firebase/firestore';
import { useRef } from 'react';
import { getFirestore } from 'firebase/firestore';
import { app } from '../utils/Firebase/firebase';

const searchClient = algoliasearch('ZG1CIQ3EAR', 'e173b451d61a8152f059f1cbcbdb6ed2');

const Search = () => {
    const clickPoint = useRef();
    const handleFocus = () => {
        clickPoint.current.style.display = "none";
    };

    const handleBlur = () => {
        clickPoint.current.style.display = "block";
    };
    return (
        <div className="items-center px-4 flex justify-center" >
            <div className="relative mr-3">
                <InstantSearch searchClient={searchClient} indexName="materials">
                    <SearchBox />
                    <Hits hitComponent={Material} />
                </InstantSearch>
            </div>
        </div>
    );
}

const CustomHighlight = connectHighlight(({ hit }) => {
    console.log(hit)
    return (
        <div>
            <h3>{hit.author.name}</h3>
            <img src={hit.author.imageUrl} alt={hit.author.name} />

        </div>
    );
});

const Material = ({ hit }) => {
    const author = getDoc(doc(getFirestore(app), 'StripeCustomers', hit.Author.substring(hit.Author.indexOf('/') + 1))).then(author => {
        return author.data();
    }
    ).catch(error => {
        console.log(error);
    }
    );


    const data = {
        title: hit.title,
        link: "/materials/type=" + hit.Author.substring(0, hit.Author.indexOf('/')) + "/uuid=" + hit.objectID,
        thumbnail: "#",
        type: hit.Author.substring(0, hit.Author.indexOf('/')),
        subject: hit.info.specs.subject,
        class: hit.info.specs.class,
        author: {
            name: author.FirstName + " " + author.LastName,
            imageUrl: author.profileUrl,
            profileUrl: "/user/id=" + author.id
        }
    }
    // return gridData;
    return (
        <p>
            <CustomHighlight hit={data} />
        </p>
    );

}



export default Search;