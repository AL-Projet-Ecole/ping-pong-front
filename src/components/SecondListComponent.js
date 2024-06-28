import React, {useEffect, useState} from "react";
import {
    SECContent,
    SearchInput,
    SecondeContainer,
    Seconde,
    SecondeText,
    SecondeToggleIcon,
    Answer,
    Heading,
    SearchInputContainer, SEC, AddButton, DeleteButton, ButtonContainer,
} from "./CommonStyledComponents";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus.svg";
import { ReactComponent as MinusIcon } from "feather-icons/dist/icons/minus.svg";
import { ReactComponent as XIcon } from "feather-icons/dist/icons/x.svg";

const SecondListComponent = ({
                                 action,
                                 items = [],
                                 onSearch,
                                 secondTitle,
                                 onButtonClick,
                                 activeItemId,
                                 onItemClick
                             }) => {
    const [activeSecondeIndex, setActiveSecondeIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [buttonActionAdd, setButtonActionAdd] = useState("");
    const [buttonActionDel, setButtonActionDel] = useState("");

    const toggleSeconde = (questionIndex) => {
        if (activeSecondeIndex === questionIndex) {
            setActiveSecondeIndex(null);
        } else {
            setActiveSecondeIndex(questionIndex);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    useEffect(() => {
        switch (action) {
            case "gamme":
                setButtonActionAdd("addUnassignedOperation");
                setButtonActionDel("delAssignedOperation");
                break;
            case "poste":
                setButtonActionAdd("addUnassignedMachine");
                setButtonActionDel("delAssignedMachine");
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
        <SECContent>
            <Heading>
                {secondTitle}
                <SearchInputContainer>
                    <SearchInput
                        type="text"
                        placeholder="Recherche..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <AddButton onClick={() => onButtonClick(buttonActionAdd, activeItemId)}>
                        <PlusIcon />
                    </AddButton>
                </SearchInputContainer>
            </Heading>
        <SecondeContainer>
            {items.length > 0 &&
                items.map((item, index) => (
                    <SEC
                        key={index}
                        onClick={() =>
                        {toggleSeconde(index);
                        onItemClick(item);
                        }}
                        className="group"
                    >
                        <Seconde>
                            <SecondeText>{item.title}</SecondeText>
                            <ButtonContainer>
                                <SecondeToggleIcon>
                                    {activeSecondeIndex === index ? <MinusIcon /> : <PlusIcon />}
                                </SecondeToggleIcon>
                                <DeleteButton
                                    onClick={e => {
                                        e.stopPropagation();
                                        onItemClick(item);
                                        onButtonClick(buttonActionDel, item);
                                    }}
                                >
                                    <XIcon />
                                </DeleteButton>
                            </ButtonContainer>
                        </Seconde>
                        <Answer
                            variants={{
                                open: {
                                    opacity: 1,
                                    height: "auto",
                                    marginTop: "16px"
                                },
                                collapsed: {
                                    opacity: 0,
                                    height: 0,
                                    marginTop: "0px"
                                }
                            }}
                            initial="collapsed"
                            animate={
                                activeSecondeIndex === index ? "open" : "collapsed"
                            }
                            transition={{
                                duration: 0.3,
                                ease: [0.04, 0.62, 0.23, 0.98]
                            }}
                        >
                            {item.description}
                        </Answer>
                    </SEC>
                ))}
            </SecondeContainer>
        </SECContent>
    );
};

export default SecondListComponent;
