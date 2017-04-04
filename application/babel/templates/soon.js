//  VALIDATE EMAIL FUNCTION
function regexEmail(email) {
  re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
function validateEmail() {
  email = $('#form_email').val()
  if (regexEmail(email)) {
    $('.soon').addClass('filled')
    $('#next').attr('disabled', false)
  } else {
    $('.soon').removeClass('filled')
    $('#next').attr('disabled', true)
  }
  return false
}

//  VALIDATE NAME FUNCTION
function regexName(name) {
  re = /^[a-zA-Z0-9_.+-]*(?:[a-zA-Z][a-zA-Z0-9_.+-]*){2,}$/
  return re.test(name)
}
function validateName() {
  name = $('#form_name').val()
  if (regexName(name)) {
    $('.soon').addClass('filled')
    $('#send').attr('disabled', false)
  } else {
    $('.soon').removeClass('filled')
    $('#send').attr('disabled', true)
  }
  return false
}

//  TYPING FUNCTION
function typing() {
  if(!$('.soon').hasClass('typing'))
    $('.soon').addClass('typing')
  if (typeof typingTimeout !== 'undefined')
    clearTimeout(typingTimeout)
  typingTimeout= setTimeout(function() {
    $('.soon').removeClass('typing')
    $('.inputs > input').blur().attr({'disabled': true, 'required': false})
  }, 25000)
}


//  DOCUMENT READY
$(document).ready(function() {
  if($('.wrapper').hasClass('soon')) {
    
    //  PLACEHOLDER
    $('.placeholder').on('click', function() {
      typing()
      if(!$('.soon').hasClass('enterName')) {
        $('#form_email').attr({'disabled': false, 'required': true})
        setTimeout(function() { $('#form_email').focus() }, 1500)
      } else {
        $('#form_name').attr({'disabled': false, 'required': true})
        setTimeout(function() { $('#form_name').focus() }, 1500)
      }
    })
    
    //  INPUTS
    $('.inputs > input').keyup(function() {
      typing()
      if($(this).is('#form_email'))
        validateEmail()
      else if($(this).is('#form_name'))
        validateName()
    })
    
    //  NEXT
    $('#next').on('click', function(e) {
      typing()
      $('.soon').removeClass('filled').addClass('enterName')
      
      $('#form_email, #next').attr('disabled', true)
      $('#form_name').attr({'disabled': false, 'required': true})
      setTimeout(function() { $('#form_name').focus() }, 1500)
      
      e.preventDefault()
    })
    
    //  SEND
    $('#send').on('click', function(e) {
      clearTimeout(typingTimeout)
      iterationCount()
      $('.soon').removeClass('main')
      $('.inputs > input').attr({'disabled': false, 'required': true})
      
      //  Inside The Ajax Callback
      setTimeout(function() {
        iterationClear()
        $('.soon').removeClass('typing filled enterName').addClass('confirmation')
        $('.inputs > input, .click > input').val('').attr({'disabled': true, 'required': false})
        
        setTimeout(function() {
          $('.soon').removeClass('confirmation').addClass('main')
        }, 6000)
      }, 3000)
      e.preventDefault()
    })
    
  }
})