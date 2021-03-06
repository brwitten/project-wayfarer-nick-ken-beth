import React, {Component} from 'react'

class CreatePostForm extends Component {
  constructor(props){
    super(props)
    console.log("PROPS: ", this.props);
    this.state = {
      user: '59fb4641ea5a6337afc48daf',
      city:'59fb4641ea5a6337afc48db2',
      postTitle:'',
      post:''
    }
  }
  onTitleInputChange(event){
    this.setState({
      postTitle: event.target.value
    })
  }
  onBodyInputChange(event){
    this.setState({
      post: event.target.value
    })
  }
  onFormSubmit(event){
    event.preventDefault()
    console.log("onFormSubmit called");
    let postBody = this.state.post
    let postTitle = this.state.postTitle
    let postCityId = this.state.city
    let postUser = this.state.user
    let fullPost = {
      postUser,
      postCityId,
      postTitle,
      postBody
    }
    this.props.createPost(fullPost)
  }
  render(){
      return (
        <div className='createForm todoForm'>
          <button className="btn btn-info btn-lg btn3d" type="button" name="signin" data-toggle="modal" data-target="#newPost">Create New Post</button>
          <div className="modal fade" id="newPost" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close"
                       data-dismiss="modal">
                      <span aria-hidden="true">&times;</span>
                      <span className="sr-only">Close</span>
                    </button>
                    <h4 className="modal-title" id="myModalLabel">Create New Post</h4>
                </div>
                <div className="modal-body">
                    <form onSubmit={event => this.onFormSubmit(event)} role="form">
                      <div className="form-horizontal">
                        <div className="form-group">
                          <div className="col-md-12">
                            <textarea className="form-control" rows="1" placeholder="Post Title" required onChange={event => this.onTitleInputChange(event)} value={this.state.postTitle}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="form-horizontal">
                        <div className="form-group">
                          <div className="col-md-12">
                            <textarea className="form-control" rows="5" placeholder="Write post details..." required onChange={event => this.onBodyInputChange(event)} value={this.state.post}></textarea>
                          </div>
                        </div>
                      </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal"> Close </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

export default CreatePostForm
