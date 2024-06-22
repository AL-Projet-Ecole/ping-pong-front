import React, { useState } from "react";
import { SearchInput, AddButton, DeleteButton, Post, PostTextContainer, Title, Image, GlobalFirstContainer, FirstContainer, Heading, SearchInputContainer } from "./CommonStyledComponents";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus.svg";
import { ReactComponent as XIcon } from "feather-icons/dist/icons/x.svg";

const ListComponent = ({ items, onItemClick, onOpenModal, onOpenDeleteConfirmation, onSearch, firstTitle, activeGammeId }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

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
                    <AddButton onClick={onOpenModal}>
                        <PlusIcon />
                    </AddButton>
                </SearchInputContainer>
            </Heading>
            <FirstContainer>
                {items.length > 0 &&
                    items.map((item, index) => (
                        <Post
                            key={index}
                            onClick={() => onItemClick(item.id)}
                            className={`group ${activeGammeId === item.id ? 'active-gamme' : ''}`}
                        >
                            <PostTextContainer>
                                <Title>{item.title}</Title>
                            </PostTextContainer>
                            <Image $imageSrc={item.postImageSrc} />
                            <DeleteButton
                                onClick={e => {
                                    e.stopPropagation();
                                    onOpenDeleteConfirmation(item);
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
