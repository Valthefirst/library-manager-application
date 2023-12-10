package com.nneji.library.utils.execptions;

public class InUseException extends RuntimeException{

    public InUseException() {}

    public InUseException(String message) { super(message); }

    public InUseException(Throwable cause) { super(cause); }

    public InUseException(String message, Throwable cause) { super(message, cause); }
}
