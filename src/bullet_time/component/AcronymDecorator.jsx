import React from 'react';
import { List,
         ListItem,
         ListItemText,
         Popover
       } from '@material-ui/core';
import { useState } from 'react';
import { ContentBlock } from 'draft-js';

export default function  AcronymDecorator(props) {
  const [content, setContent] = useState(props.children);
  const [option, setOption] = useState(props.children);
  const [anchorEl, setAnchorEl] = useState(null);
  const [db, setDb] = useState(props.db);
  const open = Boolean(anchorEl);
  
  const handleContextMenu = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClick = event => {
    setAnchorEl(null);
    setOption(content);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
    setContent(option);
  };

  const handlePreview = event => {
    const previewBlock = new ContentBlock({
      text: event.target.innerText,
      key: props.children[0].props.block.getKey(),
      type: 'unstyled',
    });
    const origSym = props.children[0];
    const preview = {
      ...origSym,
      props: {
        ...origSym.props,
        block: previewBlock,
        text: event.target.innerText,
      }
    };

    console.log(preview);
    
    setContent([preview]);
  };


  const renderMenuOptions = () => {
    let pair_id = db.exec(
      "SELECT pair_id FROM words WHERE word LIKE '" +
        content[0].props.text + "';"
    )[0].values[0];
    let items = db.exec(
      "SELECT word FROM words WHERE pair_id = " + pair_id + ";"
    )[0].values;
    let itemRenders = [];

    for (const item of items) {
      itemRenders.push(
        <ListItem button
                  key={item}
                  onMouseOver={handlePreview}
                  onClick={handleClick}
        >
          <ListItemText>
            {item}
          </ListItemText>
        </ListItem>
      );
    }
    return (<List dense> {itemRenders} </List>);
  };
  
  return(
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {renderMenuOptions()}
      </Popover>
      <span className="acronym" onContextMenu={handleContextMenu}>
        {content}
      </span>
    </>
  );
};


