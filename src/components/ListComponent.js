import React, { useState, useEffect } from "react";
import {
    SearchInput,
    AddButton,
    DeleteButton,
    Post,
    PostTextContainer,
    Title,
    GlobalFirstContainer,
    FirstContainer,
    Heading,
    SearchInputContainer
} from "./CommonStyledComponents";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus.svg";
import { ReactComponent as XIcon } from "feather-icons/dist/icons/x.svg";

const ListComponent = ({
                           action,
                           items,
                           onItemClick,
                           onButtonClick,
                           onSearch,
                           firstTitle,
                           activeItemId
                       }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [buttonActionAdd, setButtonActionAdd] = useState("");
    const [buttonActionDel, setButtonActionDel] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    useEffect(() => {
        switch (action) {
            case "gamme":
                setButtonActionAdd("addGamme");
                setButtonActionDel("delGamme");
                break;
            case "operation":
                setButtonActionAdd("addOperation");
                setButtonActionDel("delOperation");
                break;
            case "machine":
                setButtonActionAdd("addMachine");
                setButtonActionDel("delMachine");
                break;
            case "poste":
                setButtonActionAdd("addPoste");
                setButtonActionDel("delPoste");
                break;
            case "realisation":
                setButtonActionAdd("addRealisation");
                setButtonActionDel("delRealisation");
                break;
            default:
                break;
        }
    }, [action]);

    return (
        <GlobalFirstContainer>
            <Heading>
                <span>{firstTitle}</span>
                <SearchInputContainer>
                    <SearchInput
                        type="text"
                        placeholder="Recherche..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <AddButton onClick={() => onButtonClick(buttonActionAdd)}>
                        <PlusIcon />
                    </AddButton>
                </SearchInputContainer>
            </Heading>
            <FirstContainer>
                {items.length > 0 &&
                    items.map((item, index) => (
                        <Post
                            key={index}
                            onClick={() => onItemClick(item)}
                            className={`group ${activeItemId === item.id ? "active-gamme" : ""}`}
                        >
                            <PostTextContainer>
                                <Title>{item.title}</Title>
                            </PostTextContainer>
                            <DeleteButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onButtonClick(buttonActionDel, item);
                                }}
                            >
                                <XIcon />
                            </DeleteButton>
                        </Post>
                    ))}
            </FirstContainer>
        </GlobalFirstContainer>
    );
};

export default ListComponent;
