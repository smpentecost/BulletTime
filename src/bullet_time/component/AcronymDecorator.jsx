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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
//  console.log(props.children);
  
  const handleContextMenu = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    let items = [];
    let testList = ['this', 'and', 'here'];

    for (const item of testList) {
      items.push(
        <ListItem button
                  key={item}
                  onMouseOver={handlePreview}
        >
          <ListItemText>
            {item}
          </ListItemText>
        </ListItem>
      );
    }
    return (<List dense> {items} </List>);
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


