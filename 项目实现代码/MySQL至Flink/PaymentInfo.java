package mysql_kafka2;

import java.io.UnsupportedEncodingException;

public class PaymentInfo {
    private String order_id; // 1-1
    private String book_id; // 1-2
    private String book_name; // 1-3
    private long book_num; // 1-4
    private String book_type; // 1-5
    private float book_price; // 1-6
    private String book_press; // 1-7
    private Integer id; //1-8
    
    private String orderdetailid; // 2-1
    private String orderid; // 2-2
    private String sender; // 2-3
    private String sendplace; // 2-4
    private String recipient; // 2-5
    private String receiveplace; // 2-6
    private String methodofpayment; // 2-7
    private String paytime; // 2-8
    private float freight; // 2-9
    private float total; //2-10

    public PaymentInfo(){}

    public PaymentInfo(String order_id, String book_id, String book_name, String book_type,
    		long book_num,float book_price, String book_press,Integer id,
    		String orderdetailid, String orderid, String sender, String sendplace, String recipient,
    		String receiveplace, String methodofpayment, String paytime, float freight, float total) {
        this.order_id = order_id;//1.1
        this.book_id = book_id;//1.2
        this.book_name = book_name;//1.3
        this.book_num = book_num;///1.4
        this.book_type = book_type;//1.5
        this.book_price = book_price;//1.6
        this.book_press = book_press;//1.7
        this.id = id;//1.8
        
        this.orderdetailid = orderdetailid;//2.1
        this.orderid = orderid;//2.2
        this.sender = sender;//2.3
        this.sendplace = sendplace;//2.4
        this.recipient = recipient;//2.5
        this.receiveplace = receiveplace;//2.6
        this.methodofpayment = methodofpayment;//2.7
        this.paytime = paytime;//2.8
        this.freight = freight;//2.9
        this.total = total;//2.10
    }
//1-1
    public String getOrder_id() {
        return this.order_id;
    }
    public void setOrder_id(String order_id) {
        this.order_id = order_id;
    }
//1-2
    public String getBook_id() {
        return this.book_id;
    }
    public void setBook_id(String book_id) {
        this.book_id = book_id;
    }
//1-3
    public String getBook_name() {
        return this.book_name;
    }
    public void setBook_name(String book_name) throws UnsupportedEncodingException {
        this.book_name = new String(book_name.getBytes(), "UTF-8");
    }
//1-4
    public String getBook_type() {
        return this.book_type;
    }
    public void setBook_type(String book_type) throws UnsupportedEncodingException {
        this.book_type = new String(book_type.getBytes(), "UTF-8");
    }
//1-5
    public long getBook_num() {
        return this.book_num;
    }
    public void setBook_num(long book_num) {
        this.book_num = book_num;
    }
//1-6
    public float getBook_price() {
        return this.book_price;
    }
    public void setBook_price(float book_price) {
        this.book_price = book_price;
    }
//1-7
    public String getBook_press() {
        return this.book_press;
    }
    public void setBook_press(String book_press) throws UnsupportedEncodingException {
        this.book_press = new String(book_press.getBytes(), "UTF-8");
    }
//1-8
    public Integer getId() {
        return this.id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
//2-1
    public String getOrderdetailid() {
        return this.orderdetailid;
    }
    public void setOrderdetailid(String orderdetailid) {
        this.orderdetailid = orderdetailid;
    }
//2-2
    public String getOrderid() {
        return this.orderid;
    }
    public void setOrderid(String orderid) {
        this.orderid = orderid;
    }
//2-3
    public String getSender() {
        return this.sender;
    }
    public void setSender(String sender) throws UnsupportedEncodingException {
        this.sender = new String(sender.getBytes(), "UTF-8");
    }
//2-4
    public String getSendplace() {
        return this.sendplace;
    }
    public void setSendplace(String sendplace) throws UnsupportedEncodingException {
        this.sendplace = new String(sendplace.getBytes(), "UTF-8");
    }
//2-5
    public String getRecipient() {
        return this.recipient;
    }
    public void setRecipient(String recipient) throws UnsupportedEncodingException {
        this.recipient = new String(recipient.getBytes(), "UTF-8");
    }
//2-6
    public String getReceiveplace() {
        return this.receiveplace;
    }
    public void setReceiveplace(String receiveplace) throws UnsupportedEncodingException {
        this.receiveplace = new String(receiveplace.getBytes(), "UTF-8");
    }
//2-7
    public String getMethodofpayment() {
        return this.methodofpayment;
    }
    public void setMethodofpayment(String methodofpayment) throws UnsupportedEncodingException {
        this.methodofpayment = new String(methodofpayment.getBytes(), "UTF-8");
    }
//2-8
    public String getPaytime() {
        return this.paytime;
    }
    public void setPaytime(String paytime) {
        this.paytime = paytime;
    }
//2-9
    public float getFreight() {
        return this.freight;
    }
    public void setFreight(float freight) {
        this.freight = freight;
    }
//2-10
    public float getTotal() {
        return this.total;
    }
    public void setTotal(float total) {
        this.total = total;
    }
}