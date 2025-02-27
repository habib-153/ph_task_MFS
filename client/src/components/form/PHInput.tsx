import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  onChangeFn?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PHInput = ({ type, name, label, disabled, onChangeFn, placeholder }: TInputProps) => {
  return (
    <div style={{ marginBottom: '5px' }}>
      <Controller
        name={name}
        render={({ field }) =>(
          <Form.Item label={label}>
            <Input 
              disabled={disabled}  
              {...field} 
              type={type} 
              placeholder={placeholder}
              id={name} 
              onChange={(e) => {
                field.onChange(e);
                onChangeFn?.(e);
              }}
            />
          </Form.Item>
        ) }
      />
    </div>
  );
};

export default PHInput;
