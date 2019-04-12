import React, { Fragment } from "react";

const FileBrowser = props => {
  const browsePhoto = () => {};
  const uploadPhoto = () => {};
  const cancelUpload = () => {};
  const removePhoto = () => {};

  return (
    <Fragment>
      <form className="mt-lg" id="upload" encType="multipart/form-data">
        <label className="input-label fine-btn">
          <input
            id="photo"
            type="file"
            name="photo"
            onChange={browsePhoto}
            required
          />
          <span>Upload photo</span>
        </label>
      </form>
      `, upload: `
      <div id="group-btn">
        <button
          id="save"
          className="btn btn-sm btn-link fine-btn"
          onClick={uploadPhoto}
        >
          Save
        </button>
        <button
          id="cancel"
          className="btn btn-sm btn-link fine-btn mx-md"
          onClick={cancelUpload}
        >
          Cancel
        </button>
      </div>{" "}
      `, remove: `
      <div>
        {" "}
        <button className="btn btn-sm btn-link fine-btn" onClick={removePhoto}>
          Remove photo
        </button>
      </div>
    </Fragment>
  );
};

export default FileBrowser;
